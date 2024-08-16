import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import SignUp from "./SignUp";
import { auth, db } from "../../../firebase/firebase";

jest.mock("firebase/auth");
jest.mock("firebase/firestore");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("SignUp Component", () => {
  const setSignReq = jest.fn();
  const setModal = jest.fn();

  beforeEach(() => {
    render(<SignUp setSignReq={setSignReq} setModal={setModal} />);
  });

  test("renders SignUp form", () => {
    expect(screen.getByText(/Sign up with email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rePassword/i)).toBeInTheDocument();
  });

  test("shows error when fields are empty", async () => {
    fireEvent.click(screen.getByText(/Sign Up/i));

    await waitFor(() => {
      expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();
    });
  });

  test("shows error when passwords do not match", async () => {
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password1" },
    });
    fireEvent.change(screen.getByLabelText(/rePassword/i), {
      target: { value: "password2" },
    });
    fireEvent.click(screen.getByText(/Sign Up/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Your passwords are not matching/i)
      ).toBeInTheDocument();
    });
  });

  test("handles successful form submission", async () => {
    const mockUser = {
      uid: "123",
      displayName: "Test User",
      email: "test@example.com",
    };

    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: mockUser,
    });

    (setDoc as jest.Mock).mockResolvedValueOnce(null);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password1" },
    });
    fireEvent.change(screen.getByLabelText(/rePassword/i), {
      target: { value: "password1" },
    });
    fireEvent.click(screen.getByText(/Sign Up/i));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
      expect(setModal).toHaveBeenCalledWith(false);
    });
  });

  test("handles error during form submission", async () => {
    const errorMessage = "An error occurred";
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce({
      message: errorMessage,
    });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password1" },
    });
    fireEvent.change(screen.getByLabelText(/rePassword/i), {
      target: { value: "password1" },
    });
    fireEvent.click(screen.getByText(/Sign Up/i));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
