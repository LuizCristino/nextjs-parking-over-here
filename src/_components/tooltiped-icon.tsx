import { Icon, IconProps, Tooltip, forwardRef } from '@chakra-ui/react';

const ReffedIcon = forwardRef<IconProps, 'svg'>(function ReffedIcon(
  props,
  ref
) {
  return (
    <span ref={ref}>
      <Icon {...props} />
    </span>
  );
});

export type TooltipedIconProps = IconProps & { label: string };

export const TooltipedIcon = forwardRef<TooltipedIconProps, 'svg'>(
  function TooltipedIcon(props: TooltipedIconProps) {
    const { label, ...rest } = props;

    return (
      <Tooltip hasArrow label={label}>
        <ReffedIcon {...rest} />
      </Tooltip>
    );
  }
);
