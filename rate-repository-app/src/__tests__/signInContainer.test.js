import { SignInContainer } from "../components/SignIn";
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

describe("SignIn", () => {
  describe("signInContainer", () => {
    it("login form inputs work correctly", async () => {
      const onSubmit = jest.fn();
      const signIn = jest.fn();
      const navigate = jest.fn();

      render(
        <SignInContainer
          onSubmit={onSubmit}
          signIn={signIn}
          navigate={navigate}
        />
      );

      const usernameField = screen.getByTestId("signInUsernameField");
      const passwordField = screen.getByTestId("signInPasswordField");

      expect(usernameField).toBeDefined();
      expect(passwordField).toBeDefined();

      // Type values into the login fields
      await act(async () => {
        fireEvent.changeText(usernameField, "kalle");
        fireEvent.changeText(passwordField, "password");
      });

      // Check that the fields have the correct values
      expect(usernameField.props.value).toBe("kalle");
      expect(passwordField.props.value).toBe("password");

      // Submit the form, but first find the sign in button
      await act(async () => {
        const signInButton = screen.getByTestId("signInSubmit");
        fireEvent.press(signInButton);
      });

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
