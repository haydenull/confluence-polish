import "./style.css";
import ReactDOM from "react-dom/client";
import App from "./App";

// export default defineContentScript({
//   // matches: ["*://confluence.inner.youdao.com/*"],
//   matches: ["<all_urls>"],
//   cssInjectionMode: "ui",
//   async main(ctx) {
//     // 3. Define your UI
//     const ui = await createShadowRootUi(ctx, {
//       name: "example-ui",
//       position: "inline",
//       onMount: (container) => {
//         // Container is a body, and React warns when creating a root on the body, so create a wrapper div
//         const app = document.createElement("div");
//         container.append(app);

//         // Create a root on the UI container and render a component
//         const root = ReactDOM.createRoot(app);
//         root.render(<App />);
//         return root;
//       },
//       onRemove: (root) => {
//         // Unmount the root when the UI is removed
//         root?.unmount();
//       },
//     });

//     // 4. Mount the UI
//     ui.mount();
//   },
// });

export default defineContentScript({
  matches: ["<all_urls>"],

  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      onMount: (container) => {
        // Create a root on the UI container and render a component
        let root = ReactDOM.createRoot(container);

        // 1. 找到所有 class 为 confluence-embedded-image 的元素
        const images = document.querySelectorAll(".confluence-embedded-image");
        const imageSrcList = Array.from(images).map((image) => {
          return image.getAttribute("src") || "";
        });
        // 2. 增加 image 兄弟元素 span
        images.forEach((image) => {
          const span = document.createElement("span");
          // span 类名 .faiz-confluence-polish-image-button
          span.className = "faiz-confluence-polish-image-button";
          span.textContent = "🎉";
          image.after(span);
          // 给 image 的父元素增加类名 .faiz-confluence-polish-image-container
          image.parentElement?.classList.add(
            "faiz-confluence-polish-image-container"
          );
          // 点击 span 时，初始化 React UI
          span.addEventListener("click", () => {
            // 如果已经初始化过 React UI，则先卸载
            // if (window.confluencePolishMounted) {
            //   root = ReactDOM.createRoot(container);
            // }
            const curImageSrc = image.getAttribute("src") || "";
            root.render(
              <App imageList={imageSrcList} initialImage={curImageSrc} />
            );
          });
        });

        return root;
      },
      onRemove: (root) => {
        // Unmount the root when the UI is removed
        root?.unmount();
      },
    });

    // Call mount to add the UI to the DOM
    ui.mount();
  },
});
