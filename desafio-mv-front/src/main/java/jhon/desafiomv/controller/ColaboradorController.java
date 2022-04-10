package jhon.desafiomv.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jhon.desafiomv.model.Colaborador;
import jhon.desafiomv.repository.ColaboradorRepository;

@CrossOrigin()
@RestController
@RequestMapping({"/colaborador"})
public class ColaboradorController {
	
	@Autowired
	private ColaboradorRepository repository;
	
	
	//findall
	
	@GetMapping
	public List<?> findAll(){
		return repository.encontrarTodos();
	}
	//create
	@PostMapping
	public void create( @RequestBody Colaborador colaborador) {
		
		
		  repository.salvar(colaborador.getCpf(),colaborador.getNome());
	}
	
	//findByid
	@GetMapping(value = "{id}")
	public ResponseEntity<Colaborador> findById(@PathVariable String id){
		return repository.encontrarPorId(id)
				.map(record -> 
					ResponseEntity.ok().body(record))
				.orElse(ResponseEntity.notFound().build());
	}
	
	
	//update
	@PutMapping(value = "{id}")
	public ResponseEntity<?> update(@PathVariable String id,
			@RequestBody Colaborador colaborador){
		
		return repository.encontrarPorId(id)
				.map(record ->{
					record.setNome(colaborador.getNome());
					record.setItens(colaborador.getItens());
				    	Colaborador update = repository.save(record);
					
					return ResponseEntity.ok().body("Atualizado com sucesso!");
					
				}).orElse(ResponseEntity.notFound().build());
	}
	
	//delete
	@DeleteMapping(value = "{id}")
	public ResponseEntity<?> delete(@PathVariable String id){
		return  repository.encontrarPorId(id)
				.map(record ->{
					repository.deletar(id);
					return ResponseEntity.ok().body("Id: " + id + "Deletado com sucesso");
				}).orElse(ResponseEntity.notFound().build());
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	

}
