

1- checks to which github repository we are connected

git remote -v

2- removes the link to the center repository

git remote remove origin

3- chech if the connection is still there, it should be empty no output

git remote -v

4- if i removed the .git folder i will remove all the history of the pervious commits

5- create a repository on git hub manually so we can get a URL

6- and then afterwards we copy the terminal lines and excute inside vs code from the section push an existing repository from the command line
 example output for space project

git remote add origin https://github.com/Kaionex/"name of the project".git
git branch -M main
git push -u origin main



