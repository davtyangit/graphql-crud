import { useMutation } from "@apollo/client";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_NewToy } from "../graphql/toysMutation";

const AddToy = () => {
  const name = useRef("");
  const price = useRef(0);
  const imageUrl = useRef("");

  const [addToy] = useMutation(CREATE_NewToy);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    addToy({
      variables: {
        name: name.current.value,
        price: Number(price.current.value),
        imageUrl: imageUrl.current.value,
      },
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Add</p>
      <input placeholder="name" ref={name} type="text" />
      <input placeholder="price" ref={price} type="number" />
      <input placeholder="image" ref={imageUrl} type="text" />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddToy;
