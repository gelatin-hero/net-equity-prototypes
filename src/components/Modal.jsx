import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from './ui/Sheet';

export function Modal({ open, onClose, title, titleIcon, titleIconVariant = 'green', children }) {
  const iconClass = `modal-title-icon ${titleIconVariant} modal-title-icon-wrap`;

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle id="modal-title">
            {titleIcon && (
              <span className={iconClass}>
                {titleIcon}
              </span>
            )}
            {title}
          </SheetTitle>
        </SheetHeader>
        <div className="sheet-content-inner">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
