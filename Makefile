
all: install

clear:
	@rm -rf node_modules
	@rm -rf pagkage-lock.json
	@rm -rf yarn-error.log
	@rm -rf yarn.lock

install:
	@npm install

reinstall:
	@make clear
	@make install
	
update:
	@npm update

# need brew instll icoutils
icons:
	@sips -z 256 256 icon.png --out icons.iconset/icon_256x256.png
	@sips -z 512 512 icon.png --out icons.iconset/icon_512x512.png
	@iconutil --convert icns icons.iconset --output icons.iconset/icon.icns
	@icotool --create icons.iconset/icon_256x256.png --output icons.iconset/icon.ico