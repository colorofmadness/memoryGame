type IIconProps = {
  name: string;
} & (
  | {
      size: number;
      width?: never;
      height?: never;
    }
  | {
      size?: never;
      width: number;
      height: number;
    }
);

export default IIconProps;
