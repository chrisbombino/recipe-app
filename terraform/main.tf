provider "aws" {
  region     = "us-east-2"
  access_key = ""
  secret_key = ""
}

resource "aws_security_group" "recipe-app-sg" {
  name        = "recipe-app-sg"
  description = "TODO"

  ingress {
    description = "Allow SSH connections"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    # TODO update this block to only allow my IPs
  }

  ingress {
    description = "Allow HTTP connections"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "recipe-app-vm" {
  ami             = "ami-026dea5602e368e96"
  instance_type   = "t2.micro"
  key_name        = "test-key-ec2"
  security_groups = ["${aws_security_group.recipe-app-sg.name}"]
  user_data = file("./cloud-init.yml") # install docker using cloud-init
}

resource "aws_eip" "ip" {
  instance = aws_instance.recipe-app-vm.id
}
