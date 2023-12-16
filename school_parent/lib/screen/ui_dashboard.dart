import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class DashboardPageUi extends StatefulWidget {
  const DashboardPageUi({super.key});

  @override
  State<DashboardPageUi> createState() => _DashboardPageUiState();
}

class _DashboardPageUiState extends State<DashboardPageUi> {
  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        actions: [
          IconButton(
              onPressed: () {},
              icon: const Icon(
                Icons.person,
                color: Colors.blue,
              )),
          IconButton(
              onPressed: () {},
              icon: const Icon(
                Icons.notifications,
                color: Colors.blue,
              )),
          const SizedBox(
            width: 10,
          )
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(30),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Dashboard",
                style: GoogleFonts.raleway(
                    fontSize: 30, fontWeight: FontWeight.bold),
              ),
              Text(
                "Bienvenu",
                style: GoogleFonts.raleway(fontSize: 20),
              ),
              const SizedBox(
                height: 20,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Text(
                    "_______ Enfant",
                    style: GoogleFonts.raleway(fontSize: 15),
                  ),
                ],
              ),
              SizedBox(
                height: screenHeight * 0.01,
              ),
              Container(
                height: screenHeight * 0.1,
                width: screenWidth,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    color: Colors.grey.shade100),
                child: LayoutBuilder(
                  builder: (context, constraints) {
                    // double minHeigth = constraints.minHeight;
                    double minWidth = constraints.minWidth;
                    return Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Row(
                        children: [
                          const CircleAvatar(
                            backgroundColor: Colors.red,
                            radius: 40,
                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 5, left: 10),
                            child: Container(
                              width: minWidth * 0.6,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    "Gaetan ABIO",
                                    style: GoogleFonts.raleway(
                                        fontSize: 18,
                                        fontWeight: FontWeight.bold),
                                  ),
                                  Text(
                                    "Code 47348759",
                                    style: GoogleFonts.raleway(
                                      fontSize: 14,
                                    ),
                                  ),
                                  Text(
                                    "Eleve de 5eme annee scolaire",
                                    style: GoogleFonts.raleway(
                                      fontSize: 14,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          )
                        ],
                      ),
                    );
                  },
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
