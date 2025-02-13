export interface IButtonProps {
  disabled?: boolean;
  active?: boolean;
  loading?: boolean;
  type?: HTMLButtonElement['type'];
}

export const defaultProps = {
  type: 'button' as HTMLButtonElement['type']
};
