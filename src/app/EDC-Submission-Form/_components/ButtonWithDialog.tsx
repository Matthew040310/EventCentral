import { useState } from "react";
import CustomButton, { ICustomButtonProps } from "./CustomButton";
import PopUpDialog, { TPopUpDialogProps } from "@/components/popUpDialog";

interface ButtonWithDialogProps extends
    Omit<ICustomButtonProps, "onClick">,
    Omit<TPopUpDialogProps, "onClick" | "open" | "onClose"> {
    dialogOnClick: (e: string) => void;
}

const ButtonWithDialog: React.FC<ButtonWithDialogProps> = ({
    sm = 2.5,
    xs = 4,
    color,
    disabled = false,
    endIcon,
    children,
    dialogOnClick,
    title,
    description,
    buttons
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOnClick = (e: string) => {
        dialogOnClick(e);
        setDialogOpen(false);
    }

    return (
        <>
            <CustomButton
                sm={sm}
                xs={xs}
                color={color}
                onClick={() => setDialogOpen(true)}
                disabled={disabled}
                endIcon={endIcon}>
                {children}
            </CustomButton>
            <PopUpDialog
                open={dialogOpen}
                onClose={() => { setDialogOpen(false); }}
                onClick={(userResponse) => handleDialogOnClick(userResponse)}
                title={title}
                description={description}
                buttons={buttons}
            />
        </>
    );
}

export default ButtonWithDialog;