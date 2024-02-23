packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}

source "googlecompute" "autogenerated_1" {
  credentials_file    = "credentials.json"
  image_family        = "custom-centos-stream-8"
  network             = "default"
  project_id          = "csye6225-414414"
  source_image_family = "centos-stream-8"
  ssh_username        = "csye6225"
  zone                = "us-central1-a"
}

build {
  sources = ["source.googlecompute.autogenerated_1"]

  provisioner "file" {
    source      = "webapp.zip"
    destination = "/tmp/webapp.zip"
  }
  provisioner "shell" {
    script = "appsetup.sh"
  }
 provisioner "shell" {
    script = "dbsetup.sh"
   }
   provisioner "shell" {
    script = "groupsetup.sh"
   }
   provisioner "shell" {
    script = "servicesetup.sh"
   }
   provisioner "shell " {
      inline = [
        "echo 'This is an inline Bash script'",
        "sudo systemctl start mysqld",
        "I ran command to start mysql",
        "sudo systemctl start myservice",
        "I ran to start myservice"
      ]
    }
}
