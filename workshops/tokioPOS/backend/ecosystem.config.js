module.exports = {
  apps: [
    {
      name: "tokio",
      script: "./build/index.js",
      instances: "3",
      exec_mode: "cluster",
    },
  ],
};
