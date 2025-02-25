import { enqueueSnackbar } from "notistack";

const SnackbarUtils = {
  success(msg) {
    enqueueSnackbar(msg, { variant: "success" });
  },
  error(msg) {
    enqueueSnackbar(msg, { variant: "error" });
  },
  warning(msg) {
    enqueueSnackbar(msg, { variant: "warning" });
  },
  info(msg) {
    enqueueSnackbar(msg, { variant: "info" });
  },
};

export default SnackbarUtils;
