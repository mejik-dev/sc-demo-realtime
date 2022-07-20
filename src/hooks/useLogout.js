import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const LOGOUT = gql`
  mutation logout($input: LogoutInput) {
    logout(input: $input) {
      id
    }
  }
`;

export const useLogout = () => {
  const navigate = useNavigate();

  const [logout] = useMutation(LOGOUT);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await logout({
        variables: {
          input: { token },
        },
      });
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to logout");
    }
  };

  return { handleLogout };
};
