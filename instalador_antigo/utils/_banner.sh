#!/bin/bash
#
# Print banner art.

#######################################
# Print a board. 
# Globals:
#   BG_BROWN
#   NC
#   WHITE
#   CYAN_LIGHT
#   RED
#   GREEN
#   YELLOW
# Arguments:
#   None
#######################################
print_banner() {

  clear

  printf "\n\n"

printf "${YELLOW}";


printf ${CYAN}"              ,-.\n" 
printf ${CYAN}"             /  (  '\n" 
printf ${CYAN}"     *  _.--'!   '--._\n"
printf ${CYAN}"      ,'              ''_ _____   __                     .___   ___________.__        __           __  \n"
printf ${CYAN}"     |!                  /  _  \_/  |_  ____   ____    __| _/___\__    ___/|__| ____ |  | __ _____/  |_ \n" 
printf ${CYAN}"   _.'  O      ___      /  /_\  \   __\/ __ \ /    \  / __ |/ __ \|    |   |  |/ ___\|  |/ // __ \   __\\n"
printf ${CYAN}"  (_.-^, __..-'  ''''-./    |    \  | \  ___/|   |  \/ /_/ \  ___/|    |   |  \  \___|    <\  ___/|  |\n"  
printf ${CYAN}"      /,'        '    _\____|____/__|  \_____>___|__/\____ |\_____>____|   |__|\_____>__|__\\_____>__| \n"  
printf ${CYAN}"   '         *    .-''    |\n"  
printf ${CYAN}"                 (..--^.  ' \n"  
printf ${CYAN}"                       | /\n"  
printf ${CYAN}"                       '\n"
printf "\n" 
                                                                                                                                                         
printf "            \033[1;33m        ";
printf "${NC}";

printf "\n"
}
