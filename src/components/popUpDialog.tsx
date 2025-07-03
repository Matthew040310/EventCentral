import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import TDialogButton from "@/types/TDialogButton";

export type TPopUpDialogProps = {
    open: boolean;
    onClose: () => void;
    onClick: (e: string) => void;
    title: string;
    description: string;
    buttons: TDialogButton[];
};

const PopUpDialog: React.FC<TPopUpDialogProps> = ({
    open,
    onClose,
    onClick,
    title,
    description,
    buttons,
}) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText dangerouslySetInnerHTML={{ __html: description }}>
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
            {buttons.map((button, index) => (
                <Button
                    key={index}
                    onClick={() => onClick(button.buttonOption)}
                    color={button.color}>
                    {button.buttonOption}
                </Button>
            ))}
        </DialogActions>
    </Dialog>
)

export default PopUpDialog;