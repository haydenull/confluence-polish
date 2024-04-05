import { Image } from "antd";
import { useEffect } from "react";

const App = ({
  imageList,
  initialImage,
}: {
  imageList: string[];
  initialImage: string;
}) => {
  const onVisibleChange = (visible: boolean) => {
    console.log("visible", visible);
  };

  useEffect(() => {
    window.confluencePolishMounted = true;
    return () => {
      window.confluencePolishMounted = false;
    };
  });

  return (
    // <Image.PreviewGroup
    //   items={imageList}
    //   preview={{
    //     // current:
    //     visible: true,
    //     onVisibleChange,
    //     rootClassName: "faiz-confluence-polish-preview-image-root",
    //   }}
    // />
    <div></div>
  );
};

export default App;
