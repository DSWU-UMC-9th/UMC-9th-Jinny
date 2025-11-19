import { ImageDown, MoveLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("file", file);

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    console.log("p", previewUrl);

    setPreview(previewUrl);
  };

  return (
    <div className="px-[40px] flex flex-col items-center">
      <div className="flex justify-center items-center p-3 text-xl font-bold w-full max-w-[769px]">
        <MoveLeft
          onClick={() => navigate(-1)}
          className="cursor-pointer hover:text-gray-500 text-start"
        />
        <h1 className="flex-1 text-center">LP 등록하기</h1>
      </div>

      <div className="flex flex-col items-center gap-3 w-full max-w-[769px] mt-[30px]">
        <div className="w-full border border-2 border-dashed py-10 border-gray-400 rounded-sm">
          <label htmlFor="fileInput" className="relative flex flex-col items-center">
            <ImageDown className="size-30 stroke-[1px] text-gray-800 cursor-pointer" />
            <div className="text-center px-14 mt-5 bg-gray-800 text-white py-2 rounded-lg text-md font-medium hover:bg-gray-900 transition-colors duration-500 ease-in-out cursor-pointer gap-3">
              Choose File
            </div>

            {preview && (
              <img
                src={preview}
                alt="LP 이미지"
                className="size-30 absolute top-0 object-cover"
              />
            )}
          </label>
          <input type="file" id="fileInput" className="hidden" onChange={handleChange} />
        </div>

        <input
          placeholder="LP Name"
          className="w-full flex-1 border border-gray-300 shadow-sm rounded-xl py-2 px-3 hover:border-gray-400 hover:shadow-md duration-500 outline-none cursor-pointer"
        />
        <input
          placeholder="LP Content"
          className="w-full flex-1 border border-gray-300 shadow-sm rounded-xl py-2 px-3 hover:border-gray-400 hover:shadow-md duration-500 outline-none cursor-pointer"
        />

        <div className="flex w-full gap-3">
          <input
            placeholder="LP Tag"
            className="flex-1 flex-1 border border-gray-300 shadow-sm rounded-xl py-2 px-3 hover:border-gray-400 hover:shadow-md duration-500 outline-none cursor-pointer"
          />
          <button className="bg-gray-800 text-white py-2 px-8 rounded-lg text-md font-medium hover:bg-gray-900 transition-colors duration-500 ease-in-out cursor-pointer">
            Add
          </button>
        </div>

        <button className="w-full bg-gray-800 text-white py-2 rounded-lg text-md font-medium hover:bg-gray-900 transition-colors duration-500 ease-in-out cursor-pointer">
          Add LP
        </button>
      </div>
    </div>
  );
};

export default CreatePage;
