import { useState, useEffect } from "react";

export default function useContainerContent(itemsType, callback, data, mode) {
  const [content, setContent] = useState();

  useEffect(() => {
    let newContent = handleData();
    let result;
    if (Array.isArray(newContent)) {
      result = AddItems(newContent);
    } else {
      result = newContent;
    }
    setContent(result);
  }, [data]);

  function AddItems(newContent) {
    let res;
    if (mode === "clear") {
      res = [];
    } else if (mode === "update") {
      res = Object.assign([], content);
    }
    newContent.forEach((item) => {
      res.push(item);
    });
    return res;
  }

  function handleData() {
    let content;
    if (data === null) {
      content = <div className="filler">Начните поиск</div>;
    } else if (data["items"].length === 0) {
      content = <div className="filler">Ничего не найдено</div>;
    } else {
      content = createItems(data["items"], callback);
    }
    return content;
  }

  function createItems(data, callback) {
    let items = [];
    data.forEach((item) => {
      try {
        items.push(callback(item));
      } catch {
        alert(`Спотифай один из объектов пришел некорректным, пропустим его `);
      }
    });
    return items;
  }
  return content;
}
