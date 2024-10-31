"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Select, Button, Input, Space, Spin, Alert } from "antd";
import { DownloadOutlined, SendOutlined } from "@ant-design/icons";
const { Option } = Select;

const profanityList = process.env.NEXT_PUBLIC_PROFANITY_LIST?.split(",") || [];

const PromtIt: React.FC = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [model, setModel] = useState("default");
  const [inputText, setInputText] = useState(
    process.env.NEXT_PUBLIC_DEFAULT_PROMPT || ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "downloaded_image.png";
    link.click();
  };

  const checkForProfanity = (text: string) => {
    return profanityList.some((word) =>
      text.toLowerCase().includes(word.trim().toLowerCase())
    );
  };

  const handleClick = async () => {
    if (inputText) {
      if (checkForProfanity(inputText)) {
        setError("Inappropriate language detected. Please modify your prompt.");
        // alert("Inappropriate language detected. Please modify your prompt.");
        return;
      }

      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/${encodeURIComponent(
            inputText
          )}`,
          {
            params: {
              model: model,
              seed: 5,
              width: 1280,
              height: 720,
              nologo: true, // Set `true` to exclude logos
              enhance: true, // Set `true` to enhance image quality
            },
            responseType: "blob",
          }
        );
        const imageBlob = res.data;
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImageUrl(imageObjectURL);
      } catch (err) {
        console.error("Error fetching image:", err);
        setError("Failed to fetch image. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleModelChange = (value: any) => {
    setModel(value); // Set the selected model
    console.log("Selected Model:", value);
  };
  return (
    <div className="container mx-auto flex flex-col items-center justify-center z-50 px-[5%]">
      <div className="relative border lg:min-h-[720px] min-h-[420px] max-h-[720px] w-full border-teal-200 rounded-lg mt-20 flex flex-col justify-center items-center overflow-hidden bg-slate-50/10">
        <div className=" absolute flex items-center gap-2 top-[2%] left-2">
          <span>Model:</span>
          <Select
            defaultValue={model} // Set default value for model selector
            style={{ width: "100%" }}
            onChange={handleModelChange}
            allowClear
          >
            <Option value="default">Default</Option>
            <Option value="turbo">Turbo</Option>
          </Select>
        </div>
        {loading ? (
          <Spin size="large" />
        ) : imageUrl ? (
          <div>
            <div>
              {error && (
                <Alert
                  message={error}
                  type="error"
                  className="mt-4 absolute right-[28rem] top-[22rem]"
                  showIcon
                />
              )}
            </div>
            <Image
              src={imageUrl}
              alt="Generated Image"
              width={1920}
              height={1080}
              className="object-contain w-full max-h-[720px]"
            />
          </div>
        ) : (
          <div>
            <p className="text-gray-500">No image to display</p>
            {error && (
              <Alert
                message={error}
                type="error"
                className="mt-4 absolute right-[28rem] top-[22rem]"
                showIcon
              />
            )}
          </div>
        )}
        <Button
          className="absolute right-[1%] bottom-[2%]"
          type="default"
          icon={<DownloadOutlined />}
          shape="circle"
          size="large"
          onClick={handleDownload}
          disabled={!imageUrl}
        />
      </div>
      <div className="my-10 w-full flex flex-col items-center">
        <Input
          type="text"
          placeholder="e.g., A cat....."
          className="rounded-xl w-full"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
          suffix={
            <Space>
              <Button
                icon={<SendOutlined />}
                size="large"
                onClick={handleClick}
              />
            </Space>
          }
        />
      </div>
    </div>
  );
};

export default PromtIt;
