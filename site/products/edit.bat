@echo off
setlocal enabledelayedexpansion
for /f "delims=*" %%s in ('dir /B /AD') do (
  set n=%%s
  echo Current product -^> !n!
  if not exist !n!\info.txt (
    set /P name=Name: 
    set /P cat=Category: 
    set /P price=Price[;percentage;newprice]: 
    set /P stock=Stock: 
    set /P desc=Description: 
    echo. 2>!n!\info.txt
    echo !name!;!cat!>>!n!\info.txt
    echo !price!>>!n!\info.txt
    echo !stock!>>!n!\info.txt
    echo !desc!>>!n!\info.txt
    cls
    )
)
pause