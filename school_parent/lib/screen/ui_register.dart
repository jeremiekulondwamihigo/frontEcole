import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:school_parent/screen/ui_login.dart';

class RegisterPageUi extends StatefulWidget {
  const RegisterPageUi({super.key});

  @override
  State<RegisterPageUi> createState() => _RegisterPageUiState();
}

class _RegisterPageUiState extends State<RegisterPageUi> {
  TextEditingController number = TextEditingController();
  TextEditingController password = TextEditingController();
  TextEditingController confirme = TextEditingController();
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
                height: screenHeight * 0.20,
              ),
              Text(
                'Enregistrez-vous',
                style: GoogleFonts.raleway(
                    fontWeight: FontWeight.bold, fontSize: 20),
              ),
              Text(
                'Entrer les informations',
                style: GoogleFonts.raleway(
                    fontWeight: FontWeight.bold, fontSize: 15),
              ),
              SizedBox(
                height: screenHeight * 0.04,
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
                      hintText: 'Confirme le mot de passe',
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
                height: 20,
              ),
              SizedBox(
                height: screenHeight * 0.07,
                width: double.infinity,
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: ElevatedButton(
                    onPressed: () {
                      if (password.text == confirme.text) {
                      } else {
                        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            content: Text(
                          "Mot de passe incorrect",
                          style: GoogleFonts.raleway(color: Colors.red),
                        )));
                      }
                    },
                    child: Text(
                      'Enregister',
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
                            builder: (context) => const LoginUiPage(),
                          ));
                    },
                    style: ElevatedButton.styleFrom(primary: Colors.black),
                    child: Text(
                      'Connexion',
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
