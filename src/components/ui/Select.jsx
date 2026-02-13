import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '../../utils/cn.js';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn('select-trigger', className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <span className="select-chevron" aria-hidden>▼</span>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const DROPDOWN_MAX_HEIGHT = 280;

const SelectContent = React.forwardRef(
  ({ className, children, position = 'popper', style: propsStyle, ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn('select-content', position === 'popper' && 'select-content-popper', className)}
        position={position}
        style={{
          maxHeight: DROPDOWN_MAX_HEIGHT,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          ...propsStyle,
        }}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(position === 'popper' && 'select-viewport', 'select-viewport-scroll')}
          style={{
            position: 'relative',
            minHeight: 0,
            maxHeight: DROPDOWN_MAX_HEIGHT,
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn('select-item', className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="select-item-indicator">✓</span>
    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
};
