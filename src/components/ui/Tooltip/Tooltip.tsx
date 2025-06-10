"use client";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";
import clsx from "clsx";
type TooltipCustomProps = {
    title: string;
    children: ReactNode;
    customClasses?: string;
    customArrow?: string;
    customTriggerCLasses?: string;
    customSide?: "top" | "right" | "bottom" | "left" | undefined;
};
const TooltipComponent = ({
    title,
    children,
    customClasses,
    customTriggerCLasses,
    customSide = "top",
    customArrow,
}: TooltipCustomProps) => {
    return (
        <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <div className={clsx(customTriggerCLasses)}>{children}</div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        side={customSide}
                        align="center"
                        className={clsx("TooltipContent", customClasses)}
                        sideOffset={1}
                    >
                        {title}
                        <Tooltip.Arrow
                            className={clsx("TooltipArrow", customArrow)}
                        />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};

export default TooltipComponent;
