import { Image, message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Button from '@/UI/Button';

export default function UploadImage({ name, imageUrl, onChange }) {
  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return false;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (loadEvent) => onChange(loadEvent.target.result);

    return false;
  };

  return (
    <>
      {imageUrl ? (
        <div>
          <Button
            variant="outline"
            type="button"
            onClick={() => onChange(null)}
          >
            <FaTrash />
            <span>Picture</span>
          </Button>
        </div>
      ) : (
        <ImgCrop>
          <Upload
            name={name}
            accept="image/png, image/jpeg"
            listType="picture"
            showUploadList={false}
            beforeUpload={beforeUpload}
            maxCount={1}
            onRemove={() => onChange(null)}
          >
            <Button variant="outline" type="button">
              <FaPlus />
              <span>Picture</span>
            </Button>
          </Upload>
        </ImgCrop>
      )}

      {imageUrl && <Image width={200} src={imageUrl} />}
    </>
  );
}
