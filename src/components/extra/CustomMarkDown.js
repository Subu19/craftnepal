import Markdown from "markdown-to-jsx";
const MyBold = ({ children, ...props }) => <div {...props}>{children}</div>;

const CustomMarkDown = (props) => {
  return (
    <Markdown
      options={{
        overrides: {
          h1: {
            component: MyBold,
            props: {
              className: "normaltext guideHighlight",
            },
          },
        },
      }}
    >
      {props.content}
    </Markdown>
  );
};
export default CustomMarkDown;
