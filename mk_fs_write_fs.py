#!/usr/bin/env python
#
# creation of file system image
python3 spiffsgen.py --page-size 256 --block-size 4096 262144 web_server_files/ fs.bin
# load fs to ESP32
python3 esptool-master/esptool.py --chip auto --port /dev/cu.usbserial-14120 --baud 115200 write_flash -z 0x110000 fs.bin

