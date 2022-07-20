import * as React from "react";
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
  const [token] = React.useState(localStorage.getItem("token"));

  const [logout] = useMutation(LOGOUT);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logout({
        variables: {
          input: { token },
        },
      });

      localStorage.clear("token");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to logout");
    }
  };

  return { handleLogout };
};
