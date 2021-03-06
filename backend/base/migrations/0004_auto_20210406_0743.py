# Generated by Django 3.1.7 on 2021-04-06 07:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_product_src'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='src',
            field=models.ImageField(null=True, upload_to=''),
        ),
    ]
