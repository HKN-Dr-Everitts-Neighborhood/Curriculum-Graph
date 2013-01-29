var json = [
  {
    "name": "MATH 221",
    "title": "Calculus I",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/MATH+221+-+Calculus+I",
    "prereqs": [[]],
    "coreqs": [[]]
  },
  {
    "name": "MATH 231",
    "title": "Calculus II",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/MATH+231+-+Calculus+II",
    "prereqs": [["MATH 221"]],
    "coreqs": [[]]
  },
  {
    "name": "MATH 241",
    "title": "Calculus III",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/MATH+241+-+Calculus+III",
    "prereqs": [["MATH 231"]],
    "coreqs": [[]]
  },
  {
    "name": "MATH 286",
    "title": "Intro to Differential Equations Plus",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/MATH+286+-+Introduction+to+Differential+Equations+Plus",
    "prereqs": [["MATH 241"]],
    "coreqs": [[]]
  },
  {
    "name": "PHYS 211",
    "title": "University Physics: Mechanics",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/PHYS+211+-+University+Physics%2C+Mechanics",
    "prereqs": [[]],
    "coreqs": [["MATH 231"]]
  },
  {
    "name": "PHYS 212",
    "title": "University Physics: Electricity and Magnetism",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/PHYS+212+-+University+Physics%2C+Electricity+and+Magnetism",
    "prereqs": [["PHYS 211"]],
    "coreqs": [["MATH 241"]]
  },
  {
    "name": "PHYS 213",
    "title": "University Physics: Thermal Physics",
    "link": "",
    "prereqs": [["PHYS 212"]],
    "coreqs": [[]]
  },
  {
    "name": "PHYS 214",
    "title": "University Physics: Quantum Mechanics",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/PHYS+214+-+University+Physics%2C+Quantum+Physics",
    "prereqs": [["PHYS 212"]],
    "coreqs": [[]]
  },
  {
    "name": "ECE 110",
    "title": "Introduction to Electrical and Computer Engineering",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/ECE+110+-+Introduction+to+Electrical+and+Computer+Engineering",
    "prereqs": [[]],
    "coreqs": [[]]
  },
  {
    "name": "ECE 190",
    "title": "Introduction to Computing Systems",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/ECE+190+-+Introduction+to+Computing+Systems",
    "prereqs": [["ECE 110"]],
    "coreqs": [[]]
  },
  {
    "name": "ECE 210",
    "title": "Analog Signal Processing",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/ECE+210+-+Analog+Signal+Processing",
    "prereqs": [["ECE 110", "PHYS 212"]],
    "coreqs": [["MATH 286"]]
  },
  {
    "name": "ECE 290",
    "title": "Computer Engineering I",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/ECE+290+-+Computer+Engineering+I",
    "prereqs": [["ECE 190"]],
    "coreqs": [[]]
  },
  {
    "name": "ECE 329",
    "title": "Fields and Waves I",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/ECE+329+-+Fields+and+Waves+I",
    "prereqs": [["ECE 210"]],
    "coreqs": [[]]
  },
  {
    "name": "ECE 340",
    "title": "Solid State Electronic Devices",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/ECE+340+-+Solid+State+Electronic+Devices",
    "prereqs": [["PHYS 214"]],
    "coreqs": [["ECE 329"]]
  },
  {
    "name": "RHET 105",
    "title": "Principles of Composition",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/RHET+105+-+Principles+of+Composition",
    "prereqs": [[]],
    "coreqs": [[]]
  },
  {
    "name": "ECE 304",
    "title": "Photonic Devices",
    "prereqs": [["PHYS 214"]],
    "coreqs": [[]]
  },
  {
    "name": "ECE 307",
    "title": "Techniques for Engrg Decisions",
    "prereqs": [["ECE 210"]],
    "coreqs": [["ECE 313"]]
  },
  {
    "name": "ECE 310",
    "title": "Digital Signal Processing",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/ECE+310+-+Digital+Signal+Processing+I",
    "prereqs": [["ECE 210"]],
    "coreqs": [[]]
  },
  {
    "name": "ECE 311",
    "title": "Digital Signal Processing Lab",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/ECE+311+-+Digital+Signal+Processing+Lab",
    "prereqs": [[]],
    "coreqs": [["ECE 310"]]
  },
  {
    "name": "ECE 313",
    "title": "Probability with Engrg Applic",
    "crosslist": ["MATH 362"],
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/ECE+313+-+Probability+with+Engineering+Applications",
    "prereqs": [["ECE 210"]],
    "coreqs": [[]]
  },
  {
    "name": "ECE 316",
    "title": "Ethics and Engineering",
    "crosslist": ["PHIL 316"],
    "prereqs": [["RHET 105"]],
    "coreqs": [[]]
  },
  {
    "name": "ECE 330",
    "title": "Power Circuits and Electromechanics",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/ECE+330+-+Power+Circuits+and+Electromechanics",
    "prereqs": [["ECE 210"]],
    "coreqs": [[]]
  },
  {
    "name": "ECE 333",
    "title": "Green Electric Energy",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/ECE+333+-+Green+Electric+Energy",
    "prereqs": [["ECE 210"]],
    "coreqs": [[]]
  },
  {
    "name": "ECE 342",
    "title": "Electronic Circuits",
    "link": "https://wiki.engr.illinois.edu/pages/viewpage.action?pageId=194289968",
    "prereqs": [["ECE 210"]],
    "coreqs": [[]]
  },
  {
    "name": "ECE 343",
    "title": "Electronic Circuits Lab",
    "link": "https://wiki.engr.illinois.edu/pages/viewpage.action?pageId=194289968",
    "prereqs": [[]],
    "coreqs": [["ECE 342"]]
  },
  {
    "name": "ECE 350",
    "title": "Fields and Waves II",
    "link": "https://wiki.engr.illinois.edu/display/HKNDEN/ECE+350+-+Fields+and+Waves+II",
    "prereqs": [["ECE 329"]],
    "coreqs": [[]]
  }
 ];
