import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:school_parent/screen/ui_register.dart';

import 'ui_dashboard.dart';

class LoginUiPage extends StatefulWidget {
  const LoginUiPage({super.key});

  @override
  State<LoginUiPage> createState() => _LoginUiPageState();
}

class _LoginUiPageState extends State<LoginUiPage> {
  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(30),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                height: screenHeight * 0.24,
              ),
              Text(
                'Bienvenu chez SchoolAPP',
                style: GoogleFonts.raleway(
                    fontWeight: FontWeight.bold, fontSize: 20),
              ),
              Text(
                'Connectez-vous',
                style: GoogleFonts.raleway(
                    fontWeight: FontWeight.bold, fontSize: 15),
              ),
              SizedBox(
                height: screenHeight * 0.05,
              ),
              Padding(
                padding: const EdgeInsets.only(top: 8),
                child: TextFormField(
                  cursorColor: Colors.black,
                  decoration: InputDecoration(
                      prefixIcon: const Icon(
                        Icons.phone,
                        color: Colors.blue,
                        size: 20,
                      ),
                      hintText: 'Numero Telephone',
                      hintStyle: GoogleFonts.raleway(),
                      focusedBorder: OutlineInputBorder(
                          borderSide: const BorderSide(
                            color: Colors.black,
                          ),
                          borderRadius: BorderRadius.circular(12)),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12))),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 8),
                child: TextFormField(
                  cursorColor: Colors.black,
                  decoration: InputDecoration(
                      prefixIcon: const Icon(
                        Icons.key,
                        color: Colors.blue,
                        size: 20,
                      ),
                      hintText: 'Mot de passe',
                      hintStyle: GoogleFonts.raleway(),
                      focusedBorder: OutlineInputBorder(
                          borderSide: const BorderSide(
                            color: Colors.black,
                          ),
                          borderRadius: BorderRadius.circular(12)),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12))),
                ),
              ),
              const SizedBox(
                height: 15,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    'Vous avez oublier le mot de passe ?',
                    style: GoogleFonts.raleway(
                        fontSize: 10, fontStyle: FontStyle.italic),
                  ),
                ],
              ),
              const SizedBox(
                height: 15,
              ),
              SizedBox(
                height: screenHeight * 0.07,
                width: double.infinity,
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const DashboardPageUi(),
                          ));
                    },
                    child: Text(
                      'Connectez-vous',
                      style: GoogleFonts.raleway(
                          fontWeight: FontWeight.bold, fontSize: 15),
                    ),
                  ),
                ),
              ),
              SizedBox(
                height: screenHeight * 0.07,
                width: double.infinity,
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const RegisterPageUi(),
                          ));
                    },
                    style: ElevatedButton.styleFrom(primary: Colors.black),
                    child: Text(
                      'Creer un compte',
                      style: GoogleFonts.raleway(
                          fontWeight: FontWeight.bold, fontSize: 15),
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
