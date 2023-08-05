"use client";
import { Drawer as UnstyledDrawer } from "vaul";
import { cn } from "@/lib/utils";
function DrawerContent({
  title,
  className,
  children
}: React.HTMLAttributes<HTMLDivElement>
  // { className?: string | undefined, title: string, children: React.ReactNode }
) {
  return (
    <UnstyledDrawer.Portal>
      <UnstyledDrawer.Overlay className="fixed inset-0 bg-black/40" />
      <UnstyledDrawer.Content className={cn("bg-zinc-100 flex flex-col rounded-t-[10px] h-[90%] mt-24 fixed bottom-0 left-0 right-0", className)}>
        <div className="p-4 bg-white rounded-t-[10px] flex-1">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
          <div className="max-w-md mx-auto">
            <UnstyledDrawer.Title className="font-medium mb-4">
              {title}
            </UnstyledDrawer.Title>
            {children}
          </div>
        </div>
        <div className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto">
          <div className="flex gap-6 justify-end max-w-md mx-auto">
          </div>
        </div>
      </UnstyledDrawer.Content>
    </UnstyledDrawer.Portal>
  );
}

const Drawer = UnstyledDrawer.Root
const DrawerTrigger = UnstyledDrawer.Trigger

export {
  Drawer,
  DrawerTrigger,
  DrawerContent
}
