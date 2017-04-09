# Tackling Openshift

## If you're running out of disk space, try to check these

### Disk Usage

SSH into your gear and run Linux `du` command [du manual](http://www.tecmint.com/check-linux-disk-usage-of-files-and-directories/)

`du -hc`

For sorted output:

`du | sort -n`

### Show gears quota:

rhc show-app live --gears quota

### Clean some space:

`rhc app-tidy -a qa`

Deletes all the contents of the log and /tmp directory on the gears to free up disk space.

### See also:

* https://developers.openshift.com/managing-your-applications/filesystem.html

### If 500 Error: Service Temporarily Unavailable

rhc ssh live
cd app-root/repo/
node start
