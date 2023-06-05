import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_AllToys } from "../graphql/toysQuery";
import { useNavigate } from "react-router-dom";
import { DELETE_ToyById } from "../graphql/toysMutation";

const AllToys = () => {
  const [allToysData, setAllToysData] = useState([]);

  const [deleteToy] = useMutation(DELETE_ToyById);

  const navigate = useNavigate();

  const { data } = useQuery(GET_AllToys, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (data?.allToys) {
      setAllToysData(data.allToys);
    }
  }, [data]);

  const handleDelete = (id) => {
    deleteToy({
      variables: {
        id: id,
      },
    }).then(() => {
      setAllToysData((existingData) => {
        return existingData.filter((item) => item.id != id);
      });
    });
  };

  return (
    <div className="toys_container">
      {allToysData.map((toy) => {
        return (
          <div className="card" key={toy.id}>
            <span className="name">{toy.name}</span>
            <span className="price">{toy.price}</span>
            <img className="card_img" src={toy.imageUrl} alt="" />
            <div className="actions">
              <button
                className="btn_style"
                onClick={() => navigate(`/edit-toy/${toy.id}`)}
              >
                Edit
              </button>
              <button
                className="btn_style"
                onClick={() => handleDelete(toy.id)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllToys;
