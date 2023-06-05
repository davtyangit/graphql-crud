import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_Toy } from "../graphql/toysMutation";
import { GET_ToyById } from "../graphql/toysQuery";

const EditToy = () => {
  const name = useRef("");
  const price = useRef(0);
  const imageUrl = useRef("");

  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(GET_ToyById, {
    variables: { id: Number(id) },
  });

  const [updateToy] = useMutation(UPDATE_Toy);

  useEffect(() => {
    if (data?.Toy) {
      name.current.value = data.Toy.name;
      price.current.value = data.Toy.price;
      imageUrl.current.value = data.Toy.imageUrl;
    }
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateToy({
      variables: {
        id: Number(id),
        name: name.current.value,
        imageUrl: imageUrl.current.value,
        price: Number(price.current.value),
      },
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Edit</p>
      <input placeholder="name" ref={name} type="text" />
      <input placeholder="price" ref={price} type="number" />
      <input placeholder="image" ref={imageUrl} type="text" />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditToy;
