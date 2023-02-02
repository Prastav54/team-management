import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";

export default function CustomModal({ onModalSubmit, onModalClose, children, ...props }) {
    const [open, setOpen] = useState(props.showModal || false);

    useEffect(() => {
        setOpen(props.showModal);
    }, [props.showModal]);

    const handleSubmitCallback = () => {
        onModalSubmit();
    }

    const handleCloseCallback = () => {
        onModalClose();
    }

    return (
        <Dialog
            open={open}
            onClose={handleCloseCallback}
            maxWidth={props.maxWidth}
            fullWidth={props.fullWidth}
            scroll={props.scroll}
            disableEscapeKeyDown={props.disableEscapeKeyDown}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullScreen={props.fullScreen}
        >
            {props.title &&
                <DialogTitle disableTypography>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="h6" color="textPrimary">{props.title}</Typography>
                        {props.showCloseIcon ? (
                            <IconButton aria-label="close"
                                onClick={handleCloseCallback}>
                                <Close />
                            </IconButton>
                        ) : null}
                    </Box>
                </DialogTitle>
            }
            <DialogContent dividers={props.dividers}>
                {children}
            </DialogContent>
            {!props.hideFooter &&
                <DialogActions>
                    {!props.hideCancelBtn &&
                        <Button onClick={handleCloseCallback} size={props.cancelButtonSize} variant={props.cancelButtonVariant} color={props.cancelButtonColor}>
                            {props.cancelButtonText}
                        </Button>
                    }
                    {!props.hideSubmitBtn &&
                        <Button onClick={handleSubmitCallback} size={props.submitButtonSize} variant={props.submitButtonVariant} color={props.submitButtonColor}>
                            {props.submitButtonText}
                        </Button>
                    }
                </DialogActions>
            }
        </Dialog>
    );
}


CustomModal.propTypes = {
    maxWidth: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
    fullWidth: PropTypes.bool,
    fullScreen: PropTypes.bool,
    scroll: PropTypes.oneOf(["paper", "body"]),
    disableEscapeKeyDown: PropTypes.bool,
    showCloseIcon: PropTypes.bool,
    dividers: PropTypes.bool,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element
    ]),
    hideFooter: PropTypes.bool,
    cancelButtonText: PropTypes.string,
    submitButtonText: PropTypes.string,
    cancelButtonVariant: PropTypes.string,
    submitButtonVariant: PropTypes.string,
    cancelButtonColor: PropTypes.string,
    submitButtonColor: PropTypes.string,
    cancelButtonSize: PropTypes.oneOf(["small", "medium", "large"]),
    submitButtonSize: PropTypes.oneOf(["small", "medium", "large"]),
    hideCancelBtn: PropTypes.bool,
    hideSubmitBtn: PropTypes.bool,
    handleSubmitCallback: PropTypes.func,
    handleCancelCallback: PropTypes.func,
};

CustomModal.defaultProps = {
    showCloseIcon: true,
    dividers: true,
    maxWidth: "md",
    fullWidth: true,
    fullScreen: false,
    scroll: "paper",
    disableEscapeKeyDown: true,
    hideFooter: false,
    cancelButtonText: "Close",
    submitButtonText: "Submit",
    cancelButtonVariant: "contained",
    submitButtonVariant: "contained",
    cancelButtonColor: "secondary",
    submitButtonColor: "primary",
    cancelButtonSize: "medium",
    submitButtonSize: "medium",
    hideCancelBtn: false,
    hideSubmitBtn: false,
};