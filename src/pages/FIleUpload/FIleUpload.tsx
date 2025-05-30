import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Image } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setImageUrl } from "../../redux/features/auth.slice";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
};

const FileUpload = () => {
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const handleChange: UploadProps["onChange"] = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            setLoading(false);
        }
    };

    const dispatch = useDispatch()
    const uploadImage = async (options: any) => {
        const { onSuccess, onError, file } = options;
        const fmData = new FormData();
        fmData.append("file", file);
        axios
            .post<{fileUrl: string}>("https://keldibekov.online/upload", fmData)
            .then((res) => {
                if (res.data.fileUrl) {
                    dispatch(setImageUrl(res.data.fileUrl))
                }
            })
            .catch((err) => onError(err));
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <div>
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={true}
                onPreview={handlePreview}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                customRequest={uploadImage}
                maxCount={1}

            >
                {uploadButton}
            </Upload>
            <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
            />
        </div>
    );
};

export default React.memo(FileUpload);
