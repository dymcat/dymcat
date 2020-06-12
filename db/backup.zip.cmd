@echo off
chcp 65001
color b0
pushd %1 & for %%i in (.) do set folder=%%~ni
title %folder%
if exist ..\bin\java.exe (
	..\bin\java.exe -cp ..\java\runtime\h2-1.4.200.jar org.h2.tools.Script -url jdbc:h2:./h2;database_to_upper=false;auto_reconnect=true;mode=mysql -script backup.zip -options compression zip
) else if exist ..\..\bin\java.exe (
	..\..\bin\java.exe -cp ..\java\runtime\h2-1.4.200.jar org.h2.tools.Script -url jdbc:h2:./h2;database_to_upper=false;auto_reconnect=true;mode=mysql -script backup.zip -options compression zip
) else (
	..\..\..\bin\java.exe -cp ..\java\runtime\h2-1.4.200.jar org.h2.tools.Script -url jdbc:h2:./h2;database_to_upper=false;auto_reconnect=true;mode=mysql -script backup.zip -options compression zip
)