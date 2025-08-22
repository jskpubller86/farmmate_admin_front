import React, { FormEventHandler, useState } from "react";
import uploadFile from "../../utils/file_upload";

const Form: React.FC = () => {
  const [selected, setSelected] = useState<File | null>(null);
  const [src, setSrc] = useState("");

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelected(file);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    uploadFile(selected!).then((res) => {
      if (res.state) {
        setSrc(res.path);
      }
    });
  };

  return (
    <form onSubmit={submit}>
      <input type="file" accept="image/*" onChange={changeFile} />
      <input type="submit" value="전송" />
      <img src={src} alt="" />
    </form>
  );
};

export default Form;
