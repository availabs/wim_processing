awk -v FIELDWIDTHS='1 2 6 1 1 2 2 2 2 2 3 4 2 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3' -v OFS=',' '                                                    
    { $1=$1 ""; print }                                                                                                                                        
' 'NY_DEC_2012 (TMAS).WGT'
