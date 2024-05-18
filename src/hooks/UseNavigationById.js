import { useNavigate } from "react-router-dom";

export const useNavigationById = () => {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    if (!id) {
      navigate("*");
    } else {
      navigate(`/watch/${id}`);
      window.scrollTo({ top: 0 });
    }
  };

  return handleNavigate;
};
