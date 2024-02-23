import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Text,
  Container,
  Button,
  Stack,
} from "@mantine/core";
import Logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/authContext";
import { signin, register } from "../services/authAPI";

const AuthForm = () => {
  const [mode, setMode] = useState("login");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await signin(email, password);

      const data = response.data;
      const accessToken = data.access_token;
      const name = data.name;

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("name", name);

      console.log("Login successful");
      login();
      navigate("/dashboard");
    } catch (error: any) {
      setError("Incorrect email address or password");
    }
  };

  const handleRegister = async () => {
    try {
      await register(name, email, password);
      toggleMode();
    } catch (error: any) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "Email already exists"
      ) {
        setError("Email has been already registered.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  const toggleMode = () => {
    setEmail("");
    setName("");
    setPassword("");
    setError(null)
    setMode(mode === "login" ? "register" : "login");
  };

  return (
    <Container size={500} my={40} className="mt-20">
      <img src={Logo} alt="logo" width={500} className="" />

      <Paper withBorder shadow="md" p={30} radius="md" className="m-auto w-4/5">
        {mode === "login" ? (
          <Stack>
            <TextInput
              label="Email"
              placeholder="Your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <Button
              fullWidth
              mt="xl"
              color="indigo"
              className="bg-indigo-500 hover:bg-indigo-600"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Text color="dimmed" size="sm" align="center" mt={5}>
              Don't have an account?{" "}
              <Anchor href="#" size="sm" onClick={toggleMode}>
                Register
              </Anchor>
            </Text>
            {error && <Text color="red" fz="md" className="text-center">{error}</Text>}
          </Stack>
        ) : (
          <Stack>
            <TextInput
              label="Name"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <TextInput
              label="Email"
              placeholder="Your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <Button
              fullWidth
              mt="xl"
              color="indigo"
              className="bg-indigo-500 hover:bg-indigo-600"
              onClick={handleRegister}
            >
              Register
            </Button>
            <Text color="dimmed" size="sm" align="center" mt={5}>
              Already have an account?{" "}
              <Anchor href="#" size="sm" onClick={toggleMode}>
                Login
              </Anchor>
            </Text>
            {error && <Text color="red" fz="md" className="text-center">{error}</Text>}
          </Stack>
        )}
      </Paper>
    </Container>
  );
};

export default AuthForm;
