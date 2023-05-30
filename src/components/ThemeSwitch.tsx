import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "dark and light mode toggler" } };

type ThemeProps = {
  isDarkMode: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ThemeSwitch({ isDarkMode, handleChange}: ThemeProps): JSX.Element { return (
    <div
      style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}
    >
      <Switch {...label} checked={isDarkMode} onChange={handleChange} />
    </div>
  );
}
