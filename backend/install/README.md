# Install as server

1. Make sure that nvm is installed

    ```
        # Install Node Version Manager (NVM)
        curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

        # Rerun Profile script to start NVM
        source ~/.bashrc  # Rerun profile after installing nvm
    ```
1. execute `nvm install v10.13.0`
1. execute `nvm use` from the deployment folder once.
1. copy the service definition
    ```
    sudo cp tello-station.service /etc/systemd/system/
    ```
1. Enable and Check if the service is running:
    ```
    sudo systemctl enable tello-station.service
    
    sudo systemctl status tello-station.service
    
    sudo systemctl restart tello-station.service
    ```
1. See the logs
    ```
    sudo journalctl -u tello-station.service
    # For real time logs just add -f argument
    sudo journalctl -fu tello-station.service
    ```    
1. connect to [http://<IP OF PI>:3000](http://<IP OF PI>:3000)