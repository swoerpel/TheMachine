#! /usr/bin/env python
from gimpfu import *

def echo(*args):
  # gimp.message('WOOHOO')
  img = gimp.image_list()[0]
  L1 = img.layers[0]
  # L2 = L1.copy()
  # img.add_layer(L2,0)
  pdb.plug_in_edge(img,L1, 10, 0, 0) # amount, WRAP, SOBEL FINALLY CORRECT SYNTAX
  # pdb.gimp_by_color_select(L1,(255,255,255),0,CHANNEL_OP_REPLACE,True,False,0,True)
  pdb.gimp_image_select_color (img , CHANNEL_OP_REPLACE, L1, (0,0,0))
  # pdb.gimp_channel_set_opacity(L1, 0)
  # pdb.gimp_edit_clear(L1)
  # L1.opacity = 50.0


register(
  "console_echo", "", "", "", "", "",
  "<Toolbox>/Xtns/Languages/Python-Fu/Test/_Console Echo", "",
  [],
  [],
  echo
  )
 
main()