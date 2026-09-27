import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Default, WithError } from "./Input.stories";
import { Input } from "./Input";

describe("Input stories", () => {
  it("renders the default input with its helper text", () => {
    render(<Input {...Default.args} />);

    const input = screen.getByLabelText("Email Address") as HTMLInputElement;
    expect(input).toHaveAttribute("placeholder", "Enter your email");
    expect(input.value).toBe("");
    expect(
      screen.getByText("We'll never share your email."),
    ).toBeInTheDocument();
  });

  it("shows the supplied failure message and preserves the invalid value", () => {
    render(<Input {...WithError.args} />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    expect(input.value).toBe("short");
    expect(
      screen.getByText("Password must be at least 8 characters long."),
    ).toBeInTheDocument();
  });

  it("accepts an empty value without optional label or helper text", () => {
    render(<Input placeholder="Optional value" value="" readOnly />);

    const input = screen.getByPlaceholderText(
      "Optional value",
    ) as HTMLInputElement;
    expect(input.value).toBe("");
    expect(screen.queryByText(/must be|went wrong/i)).not.toBeInTheDocument();
  });
});
