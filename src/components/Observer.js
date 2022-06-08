import { useInView } from "react-intersection-observer";
import { switchError } from "../Api";

export default function Observer(props) {
  let text = "";
  const { ref, inView, entry } = useInView({
    rootMargin: "100px 0px",
    onChange: () => {
      if (inView) {
        if (props.next !== null) {
          props
            .updateFunc("", props.next)
            .then((data) => {
              if (data.ok === false) {
                console.log("hi");
                return Response.reject(data);
              }
              props.setData(data[props.itemsType]);
            })
            .catch((err) => {
              switchError(err.status);
            });
          text = "loading..";
        }
      }
    },
  });
  return <div ref={ref}>loading...</div>;
}
